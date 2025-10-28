//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:openapi/src/model/payments_trip_id_refunds_get200_response_items_inner.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_trip_id_refunds_get200_response.g.dart';

/// PaymentsTripIdRefundsGet200Response
///
/// Properties:
/// * [items] 
@BuiltValue()
abstract class PaymentsTripIdRefundsGet200Response implements Built<PaymentsTripIdRefundsGet200Response, PaymentsTripIdRefundsGet200ResponseBuilder> {
  @BuiltValueField(wireName: r'items')
  BuiltList<PaymentsTripIdRefundsGet200ResponseItemsInner>? get items;

  PaymentsTripIdRefundsGet200Response._();

  factory PaymentsTripIdRefundsGet200Response([void updates(PaymentsTripIdRefundsGet200ResponseBuilder b)]) = _$PaymentsTripIdRefundsGet200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsTripIdRefundsGet200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsTripIdRefundsGet200Response> get serializer => _$PaymentsTripIdRefundsGet200ResponseSerializer();
}

class _$PaymentsTripIdRefundsGet200ResponseSerializer implements PrimitiveSerializer<PaymentsTripIdRefundsGet200Response> {
  @override
  final Iterable<Type> types = const [PaymentsTripIdRefundsGet200Response, _$PaymentsTripIdRefundsGet200Response];

  @override
  final String wireName = r'PaymentsTripIdRefundsGet200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsTripIdRefundsGet200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.items != null) {
      yield r'items';
      yield serializers.serialize(
        object.items,
        specifiedType: const FullType(BuiltList, [FullType(PaymentsTripIdRefundsGet200ResponseItemsInner)]),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    PaymentsTripIdRefundsGet200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsTripIdRefundsGet200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'items':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(PaymentsTripIdRefundsGet200ResponseItemsInner)]),
          ) as BuiltList<PaymentsTripIdRefundsGet200ResponseItemsInner>;
          result.items.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PaymentsTripIdRefundsGet200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsTripIdRefundsGet200ResponseBuilder();
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

