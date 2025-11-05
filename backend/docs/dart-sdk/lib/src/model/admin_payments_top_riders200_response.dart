//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:taxi_openapi/src/model/admin_payments_top_riders200_response_items_inner.dart';
import 'package:built_collection/built_collection.dart';
import 'package:taxi_openapi/src/model/admin_payments_top_drivers200_response_totals.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_payments_top_riders200_response.g.dart';

/// AdminPaymentsTopRiders200Response
///
/// Properties:
/// * [items] 
/// * [totals] 
@BuiltValue()
abstract class AdminPaymentsTopRiders200Response implements Built<AdminPaymentsTopRiders200Response, AdminPaymentsTopRiders200ResponseBuilder> {
  @BuiltValueField(wireName: r'items')
  BuiltList<AdminPaymentsTopRiders200ResponseItemsInner>? get items;

  @BuiltValueField(wireName: r'totals')
  AdminPaymentsTopDrivers200ResponseTotals? get totals;

  AdminPaymentsTopRiders200Response._();

  factory AdminPaymentsTopRiders200Response([void updates(AdminPaymentsTopRiders200ResponseBuilder b)]) = _$AdminPaymentsTopRiders200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminPaymentsTopRiders200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminPaymentsTopRiders200Response> get serializer => _$AdminPaymentsTopRiders200ResponseSerializer();
}

class _$AdminPaymentsTopRiders200ResponseSerializer implements PrimitiveSerializer<AdminPaymentsTopRiders200Response> {
  @override
  final Iterable<Type> types = const [AdminPaymentsTopRiders200Response, _$AdminPaymentsTopRiders200Response];

  @override
  final String wireName = r'AdminPaymentsTopRiders200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminPaymentsTopRiders200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.items != null) {
      yield r'items';
      yield serializers.serialize(
        object.items,
        specifiedType: const FullType(BuiltList, [FullType(AdminPaymentsTopRiders200ResponseItemsInner)]),
      );
    }
    if (object.totals != null) {
      yield r'totals';
      yield serializers.serialize(
        object.totals,
        specifiedType: const FullType(AdminPaymentsTopDrivers200ResponseTotals),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AdminPaymentsTopRiders200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminPaymentsTopRiders200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'items':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(AdminPaymentsTopRiders200ResponseItemsInner)]),
          ) as BuiltList<AdminPaymentsTopRiders200ResponseItemsInner>;
          result.items.replace(valueDes);
          break;
        case r'totals':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AdminPaymentsTopDrivers200ResponseTotals),
          ) as AdminPaymentsTopDrivers200ResponseTotals;
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
  AdminPaymentsTopRiders200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminPaymentsTopRiders200ResponseBuilder();
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

