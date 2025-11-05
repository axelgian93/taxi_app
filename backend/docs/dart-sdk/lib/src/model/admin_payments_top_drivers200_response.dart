//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:taxi_openapi/src/model/admin_payments_top_drivers200_response_totals.dart';
import 'package:taxi_openapi/src/model/admin_payments_top_drivers200_response_items_inner.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_payments_top_drivers200_response.g.dart';

/// AdminPaymentsTopDrivers200Response
///
/// Properties:
/// * [items] 
/// * [totals] 
@BuiltValue()
abstract class AdminPaymentsTopDrivers200Response implements Built<AdminPaymentsTopDrivers200Response, AdminPaymentsTopDrivers200ResponseBuilder> {
  @BuiltValueField(wireName: r'items')
  BuiltList<AdminPaymentsTopDrivers200ResponseItemsInner>? get items;

  @BuiltValueField(wireName: r'totals')
  AdminPaymentsTopDrivers200ResponseTotals? get totals;

  AdminPaymentsTopDrivers200Response._();

  factory AdminPaymentsTopDrivers200Response([void updates(AdminPaymentsTopDrivers200ResponseBuilder b)]) = _$AdminPaymentsTopDrivers200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminPaymentsTopDrivers200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminPaymentsTopDrivers200Response> get serializer => _$AdminPaymentsTopDrivers200ResponseSerializer();
}

class _$AdminPaymentsTopDrivers200ResponseSerializer implements PrimitiveSerializer<AdminPaymentsTopDrivers200Response> {
  @override
  final Iterable<Type> types = const [AdminPaymentsTopDrivers200Response, _$AdminPaymentsTopDrivers200Response];

  @override
  final String wireName = r'AdminPaymentsTopDrivers200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminPaymentsTopDrivers200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.items != null) {
      yield r'items';
      yield serializers.serialize(
        object.items,
        specifiedType: const FullType(BuiltList, [FullType(AdminPaymentsTopDrivers200ResponseItemsInner)]),
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
    AdminPaymentsTopDrivers200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminPaymentsTopDrivers200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'items':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(AdminPaymentsTopDrivers200ResponseItemsInner)]),
          ) as BuiltList<AdminPaymentsTopDrivers200ResponseItemsInner>;
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
  AdminPaymentsTopDrivers200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminPaymentsTopDrivers200ResponseBuilder();
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

