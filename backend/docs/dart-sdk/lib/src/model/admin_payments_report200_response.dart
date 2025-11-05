//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:taxi_openapi/src/model/admin_payments_report200_response_totals.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/json_object.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_payments_report200_response.g.dart';

/// AdminPaymentsReport200Response
///
/// Properties:
/// * [items] 
/// * [totals] 
@BuiltValue()
abstract class AdminPaymentsReport200Response implements Built<AdminPaymentsReport200Response, AdminPaymentsReport200ResponseBuilder> {
  @BuiltValueField(wireName: r'items')
  BuiltList<BuiltMap<String, JsonObject?>>? get items;

  @BuiltValueField(wireName: r'totals')
  AdminPaymentsReport200ResponseTotals? get totals;

  AdminPaymentsReport200Response._();

  factory AdminPaymentsReport200Response([void updates(AdminPaymentsReport200ResponseBuilder b)]) = _$AdminPaymentsReport200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminPaymentsReport200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminPaymentsReport200Response> get serializer => _$AdminPaymentsReport200ResponseSerializer();
}

class _$AdminPaymentsReport200ResponseSerializer implements PrimitiveSerializer<AdminPaymentsReport200Response> {
  @override
  final Iterable<Type> types = const [AdminPaymentsReport200Response, _$AdminPaymentsReport200Response];

  @override
  final String wireName = r'AdminPaymentsReport200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminPaymentsReport200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.items != null) {
      yield r'items';
      yield serializers.serialize(
        object.items,
        specifiedType: const FullType(BuiltList, [FullType(BuiltMap, [FullType(String), FullType.nullable(JsonObject)])]),
      );
    }
    if (object.totals != null) {
      yield r'totals';
      yield serializers.serialize(
        object.totals,
        specifiedType: const FullType(AdminPaymentsReport200ResponseTotals),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AdminPaymentsReport200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminPaymentsReport200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'items':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(BuiltMap, [FullType(String), FullType.nullable(JsonObject)])]),
          ) as BuiltList<BuiltMap<String, JsonObject?>>;
          result.items.replace(valueDes);
          break;
        case r'totals':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AdminPaymentsReport200ResponseTotals),
          ) as AdminPaymentsReport200ResponseTotals;
          result.totals.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AdminPaymentsReport200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminPaymentsReport200ResponseBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

